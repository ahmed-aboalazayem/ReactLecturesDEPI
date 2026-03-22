/*
{ 
id: "",
title: "",
summary: "",
tags: [],
language: "", en || ar
content: ``
}  
*/

export const lectures = [
  {
    id: "1",
    title: "أساسيات React",
    summary: "شرح مفصل ومبسط لأساسيات React، المكونات، JSX، وكيفية بدء مشروع جديد.",
    tags: ["المحاضره الاولي"],
    language: "ar",
    content: `

## 🌟 أولًا: يعني إيه React أصلاً؟

React هي **مكتبة JavaScrmermaid
graph TD
    A[Component] --> B[App.jsx]
    B --> C[main.jsx]
    C --> D[index.html]ة سهلة ومنظمة.

* اتعملت بواسطة Facebook
* بدأت داخليًا 2011 واتنشرت 2013
* بتستخدمها عشان تعمل:

  * Websites 💻
  * Mobile Apps (React Native) 📱

---

## 🤯 المشكلة اللي React جات تحلها

زمان (قبل React)، المواقع كانت بتشتغل كده:

### 🧭 الطريقة التقليدية:

1. تفتح صفحة
2. تعمل click
3. السيرفر يرد عليك بصفحة HTML جديدة
4. الصفحة كلها تعمل reload 😩

👉 النتيجة:

* بطء
* إحساس سيء للمستخدم
* كل حركة = تحميل الصفحة من جديد

---

## ⚡ الحل: SPA (Single Page Application)

React غيرت الفكرة بالكامل 👇

### بدل ما تعيد تحميل الصفحة:

* الموقع بيتحمّل مرة واحدة بس
* بعد كده اللي بيتغير هو **البيانات فقط**

#### مثال بسيط:

تخيل تطبيق زي فيسبوك:

* لما تعمل لايك 👍
* الصفحة ما بتعملش reload
* اللي بيتغير هو الرقم بس

👉 ده اسمه SPA

---

## 🧩 أهم فكرة في React: Components

React مبنية على حاجة اسمها **Components**

### يعني إيه Component؟

هو **جزء صغير من الموقع** تقدر تعيد استخدامه

#### مثال:

* Navbar (الشريط العلوي)
* Footer (آخر الصفحة)
* Card (كارت منتج)
* Sidebar

💡 فكر فيها زي LEGO 🧱
بتبني الموقع من قطع صغيرة تركبها مع بعض

---

## 🧠 أنواع الـ Components

1. **Function Component** (الأهم حاليًا ✅)
2. **Class Component** (قديم ومش بنستخدمه كتير)

---

## ⚙️ مكونات أي Component

أي Component بيتكوّن من 3 حاجات:

### 1. Logic (JavaScript)

ده التفكير بتاعك

### 2. UI (اللي بيظهر)

ده اللي المستخدم بيشوفه

### 3. Export / Use

عشان تستخدمه في مكان تاني

---

## 📦 شكل المشروع في React

الموضوع ماشي كده:

\`\`\`mermaid
graph TD
    A[Component] --> B[App.jsx]
    B --> C[main.jsx]
    C --> D[index.html]
\`\`\`

### يعني إيه الكلام ده؟

* انت بتبني Components
* تجمعها في App.jsx
* App يتربط في main.jsx
* وفي الآخر يظهر في index.h#tml

💡 بس انت فعليًا بتشتغل في React مش HTML مباشرة

---

## 🚀 إنشاء مشروع React

### الطريقة الأولى (قديم):

\`\`\`bash
npx create-re#act-app appName
\`\`\`

* بيستخدم Webpack
* أبطأ شو#ية

---

### الطريقة الأفضل (حديثة 🚀):

\`\`\`bash
npm create vite@latest
\`\`\`

#### ليه Vite أفضل؟

* أسرع جدًا ⚡
* Build أسرع
* تجربة تطوير أفضل

---

## 🧠 React = React + React DOM

* **React** #→ منطق التطبيق (Logic)
* **React DOM** → بيربط React بالمتصفح (يعرضه على الشاشة)

---

## 🧾 JSX (أهم جزء لازم تفهمه)

JSX يعني:

> تكتب HTML داخل JavaScript

#### مثال:

\`\`\`jsx
<llo</h1>
\`\`\`

💡 بس ده مش HTML حقيقي
ده JavaScript شكله HTML عشان سهل القراءة

---

## 📦 React Fragment

أحيانًا React لازم ترجع عنصر واحد فقط

### المشكلة:

مينفعش ترجع عنصرين جنب بعض مباشرة

### الحل:

\`\`\`jsx
<>
  <h1>Hello</h1>
  <p>World</p>
</>
\`\`\`

💡 ده اسمه Fragment
وبيمنع إنك تضيف div زيادة ملهاش لازمة

---

## 📥 Export & Import

### 1. Default Export

\`\`\`js
export default function Navbar() {}
\`\`\`

تستورده كده:

\`\`\`js
import Navbar from './Navbar'
\`\`\`

---

### 2. Named Export

\`\`\`js
export function Navbar() {}
\`\`\`

تستورده كده:

\`\`\`js
import { Navbar } from './Navbar'
\`\`\`

---

## 🎨 إضافة Bootstrap & FontAwesome

### التثبيت:

\`\`\`bash
npm i bootstrap
npm i @fortawesome/fontawesome-free
\`\`\`

---

### في main.jsx:

\`\`\`js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
\`\`\`

---

### الاستخدام:
\n\`\`\`jsx\n<>\n  <h2 className="bg-danger">Hello React</h2>\n  <i className="fab fa-facebook"></i>\n</>\n\`\`\`\n
---

## 🧠 الخلاصة الكبيرة (فهم مش حفظ)

React ببساطة =

### 🎯 طريقة جديدة لبناء المواقع

بدل ما تعمل موقع كصفحات منفصلة:
👉 بتبنيه كـ **قطع صغيرة (Components)**

والموقع:

* بيتحمّل مرة واحدة
* بيتحدث بسرعة بدون reload
* شكله أنظف وأسهل في التطوير

---

## 💡 تشبيه بسيط جدًا

تخيل الموقع = عربية 🚗

* Components = أجزاء العربية (موتور، عجلة، باب)
* React = طريقة تركيب الأجزاء دي بشكل ذكي
* SPA = العربية بتشتغل من غير ما توقف كل مرة
`
  },
];
