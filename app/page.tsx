"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient, type GuestbookEntry } from "@/lib/supabase/client";

type Card = { label: string; icon: string; description: string; accent: string };

const groups: { title: string; subtitle: string; cards: Card[] }[] = [
  { title: "달성하는 걸\n좋아합니다", subtitle: "tiny wins, big energy", cards: [
    { label: "등산", icon: "⛰", description: "등린이지만, 열정은 뿜뿜! 100대 명산 챌린지에 도전하고 싶어요.", accent: "coral" }, { label: "러닝", icon: "⌁", description: "10km 마라톤만 5번째. 10km 50분대 진입과 하프 마라톤에 도전하고 싶어요.", accent: "blue" }, { label: "철봉", icon: "⊢", description: "집에서 매달리기만 하고 있어요. 1분 20초 매달리기가 목표예요.", accent: "yellow" }, { label: "스쿼시", icon: "◉", description: "2년째 꾸준히 하는 중! 더 잘하고 싶어요.", accent: "green" }] },
  { title: "새롭게 만드는 걸\n좋아합니다", subtitle: "make it from zero", cards: [
    { label: "이모티콘", icon: "☺", description: "이런 걸 만들어 봤습니다. (쑥쓰)", accent: "yellow" }, { label: "AI 서비스", icon: "✦", description: "웨딩 시안을 제작해 주는 웹을 만들고 보완하고 있어요.", accent: "blue" }, { label: "집밥", icon: "♨", description: "이것저것 맛나게 해 먹는 걸 좋아해요.", accent: "coral" }] },
  { title: "새롭게 배우는 걸\n좋아합니다", subtitle: "curious, always", cards: [
    { label: "AI", icon: "✳", description: "새로운 세상! 열심히 배우고 해보고 싶어요.", accent: "green" }, { label: "소비자행동", icon: "♡", description: "왜, 어떻게 소비자들이 행동하는지 공부하고 있어요.", accent: "yellow" }] },
];

function InterestCard({ card }: { card: Card }) {
  const [flipped, setFlipped] = useState(false);
  return <button className={`flip-card ${flipped ? "is-flipped" : ""}`} onClick={() => setFlipped(!flipped)} aria-label={`${card.label} ${flipped ? "설명 닫기" : "설명 보기"}`}><span className="flip-inner"><span className={`flip-face front ${card.accent}`}><b>{card.icon}</b><em>{card.label}</em><small>click me</small></span><span className={`flip-face back ${card.accent}`}><strong>{card.label}</strong><span>{card.description}</span></span></span></button>;
}

export default function Home() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]); const [name, setName] = useState(""); const [message, setMessage] = useState(""); const [status, setStatus] = useState(""); const [isLoading, setIsLoading] = useState(true); const [loadError, setLoadError] = useState("");
  const supabase = getSupabaseBrowserClient();
  useEffect(() => { const load = async () => { if (!supabase) { setLoadError("Supabase 연결 정보를 추가하면 방명록을 불러올 수 있어요."); setIsLoading(false); return; } const { data, error } = await supabase.from("guestbook_entries").select("id,name,message,created_at").order("created_at", { ascending: false }); if (error) setLoadError("방명록을 불러오지 못했어요. 잠시 후 다시 시도해주세요."); else setEntries(data); setIsLoading(false); }; load(); }, [supabase]);
  const submit = async (event: React.FormEvent) => { event.preventDefault(); if (!name.trim() || !message.trim()) return setStatus("이름과 메시지를 모두 적어주세요."); if (!supabase) return setStatus("Supabase 연결 정보를 추가하면 방명록을 받을 수 있어요."); setStatus("남기는 중..."); const { data, error } = await supabase.from("guestbook_entries").insert({ name: name.trim(), message: message.trim() }).select("id,name,message,created_at").single(); if (error) return setStatus("메시지를 남기지 못했어요. 잠시 후 다시 시도해주세요."); setEntries((current) => [data, ...current]); setName(""); setMessage(""); setStatus("메시지가 도착했어요. 고마워요!"); };
  return <main>
    <section className="hero" id="about"><header className="topbar"><a href="#about" className="mark">SY</a><nav><a href="#dream">dream</a><a href="#guestbook">guestbook</a></nav></header><p className="eyebrow">PERSONAL SCRAPBOOK · 2026</p><h1><span>Who</span> is<br /><i>이소연?</i></h1><div className="paper-note intro-note">호기심으로 시작해서<br />끝까지 해내는 사람</div><div className="portrait-wrap"><span className="burst">HELLO!</span><div className="portrait"><img src="/soyeon-illustrated.png" alt="손을 들고 미소 짓는 이소연 일러스트" /></div><span className="tape tape-a" /><span className="tape tape-b" /></div><div className="interest-grid">{groups.map((group, index) => <section className={`interest-group group-${index + 1}`} key={group.subtitle}><div className="group-heading"><h2>{group.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{group.subtitle}</p></div><div className="card-row">{group.cards.map((card) => <InterestCard key={card.label} card={card} />)}</div></section>)}</div><p className="scroll-note">SCROLL TO READ MY NOTES ↓</p></section>
    <section className="dream-section" id="dream"><p className="eyebrow">AT DWNC, I&apos;D LOVE TO MAKE</p><h2>운동이 조금 더<br /><em>기다려지는</em> 앱.</h2><div className="idea-cloud"><span>날씨 기반 코스</span><span>신호 최소화 경로</span><span>이동형 알람</span><span>러닝 대결</span></div><p className="dream-copy">혼자여도 계속 달릴 수 있도록.\n\n그리고 다른 아이디어도 같이 나누고 싶어요.</p></section>
    <section className="contact-section"><div><p className="eyebrow">LET&apos;S SAY HELLO</p><h2>같이 재밌는 걸<br />만들어봐요.</h2></div><div className="contact-links"><a href="mailto:hello@example.com">EMAIL ↗</a><a href="#about">INSTAGRAM ↗</a><a href="#about">LINKEDIN ↗</a></div></section>
    <section className="guestbook" id="guestbook"><div className="guestbook-title"><p className="eyebrow">LEAVE A LITTLE NOTE</p><h2>방명록</h2><p>가볍게 인사 남겨주세요. 오래 기억할게요.</p></div><form onSubmit={submit}><label>이름<input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 적어주세요" maxLength={30} /></label><label>메시지<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="소연님에게 한마디" maxLength={300} rows={4} /></label><button type="submit">메시지 남기기 <span>↗</span></button>{status && <p className="form-status" aria-live="polite">{status}</p>}</form><div className="entry-list">{isLoading ? <p className="empty-note">방명록을 불러오는 중…</p> : loadError ? <p className="empty-note" role="alert">{loadError}</p> : entries.length ? entries.map((entry) => <article key={entry.id}><b>{entry.name}</b><p>{entry.message}</p><time>{new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric" }).format(new Date(entry.created_at))}</time></article>) : <p className="empty-note">첫 번째 인사를 남겨주세요 ✷</p>}</div></section><footer>MADE WITH CURIOSITY · SOYEON LEE</footer>
  </main>;
}
