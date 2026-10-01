<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
 -->

 # CampusPulse AI 🚀

CampusPulse AI is a responsive, all-in-one university student companion that combines academic productivity with campus logistics. Powered by **Next.js (App Router)**, **Prisma**, **Tailwind CSS**, and **Google Gemini API ("gemini-2.5-flash")**.

## Features Included
1. **AI Syllabus & Timetable Parser:** Upload or paste syllabi; Gemini automatically extracts courses, instructor details, meeting times, assignments, grade weights, and weekly topics with strict Zod validation and a smart Re-plan engine.
2. **Local Campus & Transport Board:** Crowdsourced transit delays, road closures, and shuttle wait times with upvotes, "still accurate?" verification votes, and an instant AI transit briefing.
3. **Student Marketplace:** Buy and sell books, electronics, or housing subleases with category filters, image attachments, and an AI Listing Generator helper.
4. **Secure Authentication & SQLite DB:** Fast setup with NextAuth credentials and local Prisma database support.

---

## Getting Started Locally

### 1. Clone & Install Dependencies
```bash
git clone [https://github.com/your-username/campus-pulse-ai.git](https://github.com/your-username/campus-pulse-ai.git)
cd campus-pulse-ai
npm install --legacy-peer-deps