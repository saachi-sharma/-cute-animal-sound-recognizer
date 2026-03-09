# Financial Institution Operations Console

This project is a lightweight web-based prototype designed for financial institutions.

## Features

- **Customer risk screening**
  - Evaluates risk using debt-to-income ratio, credit score, KYC status, and sanctions flags.
- **Transaction monitoring (AML pre-check)**
  - Applies a basic rule engine against transaction amount, destination risk level, and transaction velocity.
- **Loan affordability snapshot**
  - Calculates estimated monthly payment and payment-to-income ratio using amortization.

## How to run

Open `index.html` in a browser, or serve the folder with a static file server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- This is a demo/prototype and is **not** production-ready compliance software.
- Real-world systems require audited models, secure infrastructure, data governance, and regulatory controls.
