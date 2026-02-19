
import { GoogleGenAI, Type } from "@google/genai";
import { AuditResponse } from "../types";

const API_KEY = process.env.API_KEY;

export const auditCode = async (prd: string, code: string): Promise<AuditResponse> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure it is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const prompt = `
    You are a strict QA Judge Agent acting as a Lead Software Architect and Security Auditor.

    Your task is to evaluate whether the provided code fully complies with the Product Requirements Document (PRD).

    PRD:
    """
    ${prd}
    """

    CODE:
    """
    ${code}
    """

    Evaluation Rules:
    1. Extract ALL explicit and implicit requirements from the PRD.
    2. Check whether each requirement is implemented correctly in the code.
    3. Evaluate functional correctness, error handling, input validation, edge cases, security, and architecture.
    4. Detect missing exception handling, unsafe patterns (eval, raw SQL interpolation), hardcoded secrets, resource leaks, etc.

    Scoring Rules:
    - Start from 100.
    - Deduct points for each unmet requirement.
    - Deduct heavily (20-40 points) for CRITICAL failures (missing core feature, security flaw).
    - If any CRITICAL requirement is missing or security is Unsafe, status must be FAIL.
    - If score < 70, status must be FAIL.
    - Otherwise, status is PASS.

    Output ONLY raw JSON matching the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            compliance_score: { type: Type.NUMBER },
            status: { type: Type.STRING },
            audit_log: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  requirement: { type: Type.STRING },
                  met: { type: Type.BOOLEAN },
                  severity: { type: Type.STRING },
                  comment: { type: Type.STRING }
                },
                required: ["requirement", "met", "severity", "comment"]
              }
            },
            security_check: { type: Type.STRING },
            architecture_review: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ["compliance_score", "status", "audit_log", "security_check", "architecture_review", "summary"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    return JSON.parse(text) as AuditResponse;
  } catch (error: any) {
    console.error("Gemini Audit Error:", error);
    throw new Error(error.message || "An unexpected error occurred during the audit process.");
  }
};
