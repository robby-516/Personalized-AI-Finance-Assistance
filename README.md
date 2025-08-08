
# 💼 FinSage – Personalized AI Finance Assistant

## 📌 Overview
**FinSage** is a full-stack, AI-powered personal finance management platform built with **Django**.  
It empowers users to **track income & expenses**, **analyze trends**, and **receive personalized financial advice** for budgeting, saving, and investing.

The platform integrates **advanced AI models** to deliver **clear, actionable insights** and **tailored monthly budget plans** — making financial management **simple, smart, and effective**.

---

## ✨ Key Features
- 🔐 **User Authentication** – Secure sign-up, login, and logout workflows.  
- 💰 **Income & Expense Tracking** – Add, edit, delete, and categorize transactions with descriptions and dates.  
- 📊 **Dashboard & Analytics** – Interactive charts for income, expenses, and category breakdowns.  
- 🤖 **AI Financial Assistant**  
  - Summarizes financial health.  
  - Generates actionable monthly budget plans.  
  - Suggests investment & savings strategies based on real user data.  
  - Provides clean, human-readable responses (no markdown clutter).  
- 🧾 **Bill Upload & OCR** – Upload receipts/bills, extract transaction data via OCR and AI.  
- 📂 **Data Export** – Download expenses as CSV for offline analysis.  
- 📑 **PDF Financial Reports** – Auto-generate PDF reports with charts, summaries, and tables.  
- 🎯 **Advanced Filtering** – Search by date, category, amount, and keywords.  
- 📱 **Responsive UI** – Modern, mobile-friendly interface using Bootstrap 5 and Chart.js.  

---

## 🛠 Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| **Backend**  | Django, Django ORM |
| **Frontend** | Bootstrap 5, Chart.js, Animate.css |
| **AI Integration** | Groq API (LLM models for financial analysis & OCR parsing) |
| **OCR** | Tesseract (via pytesseract) |
| **Database** | SQLite (default, can be swapped) |
| **Other** | HTML5, CSS3, JavaScript |

---

## 🚀 Getting Started

### **Prerequisites**
Before running FinSage, ensure you have:
- Python ≥ 3.8  
- Django ≥ 4.x  
- Groq API key for AI features  
- Tesseract OCR installed & configured locally  

⚠ **Note:** Tesseract OCR installation files are **not** included in this repository.  
Download and install from the [Tesseract OCR GitHub](https://github.com/tesseract-ocr/tesseract) or via your package manager.  
After installation, configure its path in `.env` as shown below.

---

### **Installation**

#### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/Personalized-AI-Finance-Assistant.git
cd Personalized-AI-Finance-Assistant
````

#### 2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

#### 3️⃣ Set up environment variables

Create a `.env` file in the project root:

```ini
GROQ_API_KEY=your_groq_api_key
TESSERACT_CMD=path_to_tesseract_executable
```

Example (Windows):

```ini
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

#### 4️⃣ Apply database migrations

```bash
python manage.py migrate
```

#### 5️⃣ Run the development server

```bash
python manage.py runserver
```

---

## 📖 Usage Guide

1. **Sign up or log in.**
2. **Add income & expenses** with categories and descriptions.
3. **Upload bills/receipts** — FinSage auto-extracts details via OCR.
4. **View dashboard** — Analyze your spending and income trends.
5. **Ask the AI assistant** for personalized budgets & investment tips.
6. **Export your data** as CSV or PDF reports.

---

## 🎨 Customization

* **AI Models**: Modify Groq API model settings for different insights.
* **Categories**: Add/edit transaction categories via Django Admin.
* **UI Styling**: Customize Bootstrap theme & Chart.js visuals in `/static`.

---

## 🤝 Contributing

Contributions are welcome!

* Fork the repository
* Create a feature branch
* Submit a pull request

For major changes, open an issue to discuss your ideas before implementation.

---

## 📜 Usage Terms
This project is shared for educational and demonstration purposes only.  
You may view and run the code locally, but you may not modify, redistribute, or use it for commercial purposes without explicit permission from the author.

---

## 📬 Contact

* 📧 **Email**: [robbyrthomas516@gmail.com](mailto:robbyrthomas516@gmail.com)
* 🌐 **GitHub**: [robby-516](https://github.com/robby-516)

---
**FinSage – Empower your financial decisions with AI. 🚀**


