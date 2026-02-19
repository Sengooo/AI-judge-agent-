# Judge Agent – AI Code Compliance Evaluator

## 📌 Project Overview

This project implements a **Judge Agent** that automatically evaluates code compliance against a Product Requirements Document (PRD).

The agent acts as a **Lead Software Architect and Security Auditor**, comparing requirements with implementation and producing a structured JSON compliance report.

This solution was built using **Google AI Studio (Prompt Engineering approach)**.

---

## 🎯 Objective

The goal is to:
* Compare PRD requirements with submitted code
* Detect missing features
* Evaluate error handling
* Identify security vulnerabilities
* Review architectural alignment
* Produce a strict JSON compliance report

---

## 🏗 Implementation Path

**Path A – Google AI Studio**
* Custom System Instructions define agent behavior
* Manual testing using PRD + code inputs
* Model outputs strict JSON schema
* Public shared link provided in submission

---

## 📂 Project Structure

```
├── prd.txt
├── code_submission.py
├── compliance_report.json
├── ai_studio_link.txt
└── README.md
```

---

## 🧪 Test Scenario

### PRD Example
The PRD defines the following requirement:
* Write a Python function to parse a CSV file
* Must handle `FileNotFoundError`
* Must return a list of dictionaries
* Must include input validation
* Must ensure safe file handling

---

### Code Submission
The provided code:
* Parses CSV
* Returns list of dictionaries
* ❌ Does NOT handle `FileNotFoundError`
* ❌ Lacks input validation

This intentional failure allows the Judge Agent to demonstrate detection capability.

---

## 🤖 Judge Agent Logic

The agent:
1. Extracts explicit and implicit requirements from PRD
2. Evaluates:
   * Functional correctness
   * Error handling robustness
   * Input validation
   * Edge case handling
   * Security risks
   * Architectural consistency
3. Assigns severity levels:
   * LOW
   * MEDIUM
   * HIGH
   * CRITICAL
4. Calculates compliance score (0–100)
5. Determines PASS/FAIL status

---

## 🔐 Security Checks Performed

The agent detects:
* Missing exception handling
* Unsafe `eval()` / `exec()` usage
* SQL injection risks
* Hardcoded secrets
* Improper file handling
* Insecure deserialization
* Resource leaks

If a CRITICAL vulnerability is detected:
* `security_check` = "Unsafe"
* status = FAIL

---

## 📊 Output Schema

The agent strictly outputs:

```json
{
  "compliance_score": 0-100,
  "status": "PASS/FAIL",
  "audit_log": [
    {
      "requirement": "string",
      "met": true/false,
      "severity": "LOW/MEDIUM/HIGH/CRITICAL",
      "comment": "string"
    }
  ],
  "security_check": "Safe/Unsafe",
  "architecture_review": "Aligned/Not Aligned",
  "summary": "Short technical explanation."
}
```

The output contains **no extra text**, ensuring strict format compliance.

---

## 📈 Grading Alignment

### Logic (40%)
* Detects missing `FileNotFoundError`
* Identifies incomplete implementations
* Evaluates implicit requirements

### Format Compliance (30%)
* Outputs raw JSON only
* Strict schema adherence

### Complexity (30%)
* Performs advanced security checks
* Includes severity classification
* Includes architectural evaluation
* Differentiates critical vs minor violations

---

## 🚀 How to Run (AI Studio)

1. Open Google AI Studio
2. Create new Chat Prompt
3. Paste System Instructions
4. Provide PRD and code in user input
5. Run evaluation
6. Export JSON result
7. Create public share link

---

## ✅ Deliverables Included
* `prd.txt`
* `code_submission.py`
* `compliance_report.json`
* `ai_studio_link.txt`
* `README.md`
