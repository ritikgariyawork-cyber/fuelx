"use client";
import { useState } from "react";
import Logo from "../components/Logo";
import { PRODUCTS, CATEGORIES } from "../data/products";

const WHY = [
  ["01", "Protein that performs", "Snacks built for active, on-the-go lifestyles."],
  ["02", "Taste first", "Bold flavours you’ll actually look forward to."],
  ["03", "Quality you can trust", "Carefully made with ingredients chosen with care."],
  ["04", "Made for everyday", "Easy to carry and enjoy at work, gym or home."]
];
const STATS = [["3", "Product lines"], ["100%", "Made in India"], ["6", "Flavours to start"], ["1", "Mission: fuel you"]];

export default function Home() {
  const [cur, setCur] = useState("All");
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  const ids = Object.keys(cart);
  const count = ids.reduce((a, i) => a + cart[i], 0);
  const total = ids.reduce((a, i) => a + PRODUCTS[i].price * cart[i], 0);

  const add = (i) => { setCart((c) => ({ ...c, [i]: (c[i] || 0) + 1 })); setStep(0); setOpen(true); };
  const change = (i, d) => setCart((c) => { const n = { ...c }; n[i] += d; if (n[i] < 1) delete n[i]; return n; });
  const close = () => { setOpen(false); if (step === 2) setStep(0); };
  const place = (e) => { e.preventDefault(); setCart({}); setStep(2); };

  return (
    <>
      <header>
        <div className="wrap">
          <a className="logo" href="#top"><Logo />FUEL<b>X</b></a>
          <nav>
            <a href="#shop">Shop</a><a href="#why">Why FUELX</a><a href="#about">About</a><a href="#contact">Contact</a>
          </nav>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="cartbtn" onClick={() => setOpen(true)}>Cart<span>{count}</span></button>
            <a className="btn sm" href="#shop">Shop now</a>
          </div>
        </div>
      </header>

      <main id="top">
        <div className="hero"><div className="wrap">
          <div>
            <div className="eyebrow">Protein bars · Protein chips · Fruit juices</div>
            <h1>Fuel your <span>everyday</span> strength.</h1>
            <p>Smart, tasty nutrition for people who keep moving. Proudly made in India.</p>
            <div className="btns"><a className="btn" href="#shop">Shop now</a><a className="btn ghost" href="#about">Our story</a></div>
          </div>
          <div className="stack" aria-hidden="true">
            <div className="pk a"><div>FUELX<small>Protein bar</small></div></div>
            <div className="pk b"><div>FUELX<small>Protein chips</small></div></div>
            <div className="pk c"><div>FUELX<small>Fruit juice</small></div></div>
          </div>
        </div></div>

        <section id="shop"><div className="wrap">
          <h2>Shop FUELX</h2>
          <p className="lead">Pick your fuel. Add to cart and check out in seconds.</p>
          <div className="tabs">
            {CATEGORIES.map((c) => (
              <button key={c} className={"tab" + (c === cur ? " on" : "")} onClick={() => setCur(c)}>{c}</button>
            ))}
          </div>
          <div className="grid">
            {PRODUCTS.map((p, i) => (cur === "All" || p.cat === cur) && (
              <div className="card" key={p.name}>
                <div className="sw" style={{ background: p.color }}>{p.tag}</div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="row"><span className="price">₹{p.price}</span><button className="btn sm" onClick={() => add(i)}>Add to cart</button></div>
              </div>
            ))}
          </div>
        </div></section>

        <section id="why" className="why"><div className="wrap">
          <h2>Built for the way you live</h2>
          <p className="lead">Nutrition that fits into your day, not the other way around.</p>
          <div className="grid">
            {WHY.map(([n, t, d]) => (
              <div className="card" key={n}><div className="num">{n}</div><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div></section>

        <section id="about" className="about"><div className="wrap">
          <div>
            <h2>Meet FUELX</h2>
            <p>FUELX is an Indian nutrition brand on a simple mission: make healthy snacking easy, tasty and part of every day.</p>
            <p>From protein bars and protein chips to fruit-based juices, everything we make is designed for people who keep moving.</p>
          </div>
          <div className="stats">
            {STATS.map(([v, l]) => (<div className="stat" key={l}><b>{v}</b><span>{l}</span></div>))}
          </div>
        </div></section>

        <section id="contact"><div className="wrap"><div className="box">
          <div>
            <h2>Get in touch</h2>
            <p>Questions, bulk orders or retail partnerships? Send us a note.</p>
            <p><b>hello@fuelx.in</b> (replace with your email)</p>
          </div>
          {sent ? <b>Thanks! We’ll be in touch soon.</b> : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input required placeholder="Your name" aria-label="Name" />
              <input required type="email" placeholder="Email address" aria-label="Email" />
              <textarea required rows={3} placeholder="How can we help?" aria-label="Message" />
              <button className="btn">Send message</button>
            </form>
          )}
        </div></div></section>
      </main>

      <footer><div className="wrap">
        <a className="logo" href="#top" style={{ color: "#fff" }}><Logo />FUEL<b>X</b></a>
        <div>© 2026 FUELX. All rights reserved.</div>
      </div></footer>

      {open && <div id="ov" onClick={close} />}
      <aside id="dr" className={open ? "open" : ""} aria-label="Cart">
        <div className="row">
          <h3 style={{ fontSize: 34 }}>Your cart</h3>
          <button className="cartbtn" style={{ color: "inherit" }} onClick={close}>Close</button>
        </div>
        {step === 2 ? (
          <>
            <h3 style={{ fontSize: 40, margin: "30px 0 10px" }}>Order placed!</h3>
            <p>Thank you for choosing FUELX. This is a demo checkout, so no payment was taken.</p>
          </>
        ) : ids.length === 0 ? (
          <p style={{ color: "var(--m)" }}>Your cart is empty. Add something tasty!</p>
        ) : (
          <>
            {ids.map((i) => (
              <div className="ci" key={i}>
                <div><b>{PRODUCTS[i].name}</b><br />₹{PRODUCTS[i].price}</div>
                <div className="q"><button onClick={() => change(i, -1)}>−</button> {cart[i]} <button onClick={() => change(i, 1)}>+</button></div>
              </div>
            ))}
            <div className="row" style={{ padding: "16px 0" }}><b>Total</b><span className="price">₹{total}</span></div>
            {step === 0 ? (
              <button className="btn" onClick={() => setStep(1)}>Checkout</button>
            ) : (
              <form onSubmit={place}>
                <input required placeholder="Full name" />
                <input required placeholder="Phone number" />
                <textarea required rows={2} placeholder="Delivery address" />
                <div className="pay">
                  <label><input type="radio" name="pm" defaultChecked /> UPI (GPay, PhonePe, Paytm)</label>
                  <label><input type="radio" name="pm" /> Credit / Debit card</label>
                  <label><input type="radio" name="pm" /> Cash on delivery</label>
                </div>
                <button className="btn">Place order · ₹{total}</button>
              </form>
            )}
          </>
        )}
      </aside>
    </>
  );
}
