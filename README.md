## Pass - Open Source Experimental Password Manager

### Goal/Vision

To build a functional, open-source password manager using Next.js, serving as a platform to explore and implement various encryption techniques, secure storage, multi-factor authentication methods (OTP, Codes), and user-friendly interfaces for managing sensitive data. Primarily a learning and experimentation project.

### Core Features

-   **Secure User Authentication:** Standard email/password login, potentially passwordless options.
-   **Master Password Encryption:** All stored vault data encrypted using a key derived from the user's master password (using PBKDF2/Argon2). The raw master password is never stored.
-   **Vault Storage:** Securely store various data types: logins (username, password, URL), secure notes, potentially credit cards, identities.
-   **Strong Encryption:** Use authenticated encryption (e.g., AES-GCM) for vault data, ensuring both confidentiality and integrity. Client-side encryption preferred where feasible.
-   **Password Generation:** Configurable strong password generator.
-   **OTP (TOTP) Support:** Store TOTP secrets and generate current codes. Display QR codes for easy setup.
-   **Data Import/Export:** Allow importing/exporting vault data in common formats (e.g., CSV, JSON), securely handled.
-   **Browser Extension (Future Goal):** Companion extension for autofill capabilities.
-   **Fun Crypto Experiments:** Integrate experiments like exploring different KDFs, symmetric/asymmetric schemes, potentially homomorphic encryption concepts (if feasible).

### Key Components / Architecture

-   **Frontend (Next.js - Client Components):**
    -   Login/Registration UI.
    -   Vault viewing, editing, adding entries.
    -   Password generator UI.
    -   OTP code display.
    -   Settings page.
    -   Client-side encryption/decryption logic using Web Crypto API (operates on data _after_ fetching the encrypted blob from the server).
-   **Backend (Next.js - API Routes / Server Components):**
    -   User authentication endpoints (signup, login, potentially session management).
    -   API endpoints to store/retrieve the _encrypted_ vault blob for the authenticated user.
    -   Handles user account management.
    -   Does _not_ have access to the decrypted vault data or the master password (only the hashed version for login).
-   **Database:**
    -   Stores user accounts (username, _hashed_ master password, salt, KDF parameters).
    -   Stores the single encrypted vault blob per user.
-   **Cryptography Module (Client-side focus):**
    -   Key derivation function (PBKDF2/Argon2 implemented via Web Crypto or library).
    -   Symmetric encryption/decryption (AES-GCM via Web Crypto).
    -   TOTP generation library (JavaScript).
    -   QR Code generation library (JavaScript).

### Tech Stack

-   Framework: Next.js (React, TypeScript)
-   Client-Side Crypto: Web Crypto API (`SubtleCrypto`), potentially libraries like `Argon2-browser`.
-   Backend Crypto: Standard libraries for hashing (e.g., Node.js `crypto`, Python `hashlib`, `passlib`).
-   Database: PostgreSQL, MongoDB, or other suitable database.
-   UI Libraries: Tailwind CSS, Material UI.
-   State Management: Zustand.
-   QR Codes: `qrcode.react` or similar.
-   TOTP: `otpauth` or similar JS library.

### Potential Challenges

-   Implementing cryptography correctly and securely (subtle mistakes are easy).
-   Securely deriving keys from master passwords (salt, iterations/cost factors).
-   Protecting the encrypted vault blob on the server (authorization).
-   Usability vs. Security tradeoffs.
-   Cross-browser compatibility for Web Crypto API.
-   Handling master password changes/recovery (often complex or impossible without storing recoverable keys, which compromises the model).
