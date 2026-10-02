import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useContests, type ActiveContest, type ContestsData, type FinishedContest } from "@/content/siteContent";
import { saveContent } from "./contentApi";
import { Card, Field, GroupTitle, SaveBar } from "./EditorKit";

const EMPTY_ACTIVE: ActiveContest = { title: "", rules: "", deadline: "", voting: "", prize: "", link: "" };

export default function ContestsEditor({ adminKey }: { adminKey: string }) {
  const initial = useContests();
  const [data, setData] = useState<ContestsData>(initial);
  const [dirty, setDirty] = useState(false);

  const update = (patch: Partial<ContestsData>) => {
    setData((p) => ({ ...p, ...patch }));
    setDirty(true);
  };
  const setActive = (k: keyof ActiveContest, v: string) => update({ active: { ...(data.active ?? EMPTY_ACTIVE), [k]: v } });
  const setFinished = (i: number, k: keyof FinishedContest, v: string) =>
    update({ finished: data.finished.map((f, j) => (j === i ? { ...f, [k]: v } : f)) });

  const finishActive = () => {
    if (!data.active || !confirm("Перенести текущий конкурс в завершённые?")) return;
    const a = data.active;
    update({
      active: null,
      finished: [{ id: Date.now().toString(36), title: a.title, text: a.rules, works: "", winner: "", votes: "", footer: "" }, ...data.finished],
    });
  };

  return (
    <div className="space-y-4">
      <GroupTitle>🏆 Активный конкурс</GroupTitle>
      {data.active ? (
        <Card>
          <Field label="Название" value={data.active.title} onChange={(v) => setActive("title", v)} />
          <Field label="Условия" value={data.active.rules} onChange={(v) => setActive("rules", v)} multiline rows={5} />
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Приём работ до" value={data.active.deadline} onChange={(v) => setActive("deadline", v)} placeholder="31 октября" />
            <Field label="Голосование" value={data.active.voting} onChange={(v) => setActive("voting", v)} placeholder="1–5 ноября" />
            <Field label="Приз" value={data.active.prize} onChange={(v) => setActive("prize", v)} placeholder="Фигурка Енотыча" />
          </div>
          <Field
            label="Куда ведёт кнопка «Участвовать»"
            value={data.active.link}
            onChange={(v) => setActive("link", v)}
            placeholder="https://max.ru/... или https://vk.ru/..."
          />
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={finishActive}
              className="rounded-lg px-3 py-2 text-sm font-semibold border flex items-center gap-2"
              style={{ borderColor: "#2E7D32", color: "#2E7D32" }}
            >
              <Icon name="Flag" size={16} />
              Завершить конкурс
            </button>
            <button
              onClick={() => confirm("Убрать активный конкурс?") && update({ active: null })}
              className="rounded-lg px-3 py-2 text-sm font-semibold border flex items-center gap-2"
              style={{ borderColor: "#C0392B", color: "#C0392B" }}
            >
              <Icon name="Trash2" size={16} />
              Убрать
            </button>
          </div>
        </Card>
      ) : (
        <Card>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Сейчас на сайте показывается «Новый конкурс — скоро».
          </p>
          <button
            onClick={() => update({ active: { ...EMPTY_ACTIVE } })}
            className="rounded-xl px-4 py-3 font-semibold flex items-center gap-2 text-white"
            style={{ backgroundColor: "var(--sea)" }}
          >
            <Icon name="Plus" size={18} />
            Запустить новый конкурс
          </button>
        </Card>
      )}

      <GroupTitle>📸 Завершённые конкурсы</GroupTitle>
      {data.finished.map((f, i) => (
        <Card key={f.id}>
          <div className="flex justify-between items-center">
            <span className="font-bold" style={{ color: "var(--sea)" }}>Конкурс {i + 1}</span>
            <button
              onClick={() => confirm("Удалить этот конкурс?") && update({ finished: data.finished.filter((_, j) => j !== i) })}
              className="rounded-lg p-2 border"
              style={{ borderColor: "#C0392B", color: "#C0392B" }}
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>
          <Field label="Название" value={f.title} onChange={(v) => setFinished(i, "title", v)} />
          <Field label="Текст" value={f.text} onChange={(v) => setFinished(i, "text", v)} multiline rows={4} />
          <div className="grid grid-cols-3 gap-3">
            <Field label="Работ" value={f.works} onChange={(v) => setFinished(i, "works", v)} placeholder="33" />
            <Field label="Победитель" value={f.winner} onChange={(v) => setFinished(i, "winner", v)} placeholder="№8" />
            <Field label="Голосов" value={f.votes} onChange={(v) => setFinished(i, "votes", v)} placeholder="103" />
          </div>
          <Field label="Текст после цифр" value={f.footer} onChange={(v) => setFinished(i, "footer", v)} multiline rows={2} />
        </Card>
      ))}
      <button
        onClick={() =>
          update({ finished: [...data.finished, { id: Date.now().toString(36), title: "", text: "", works: "", winner: "", votes: "", footer: "" }] })
        }
        className="rounded-xl px-4 py-2.5 font-semibold border flex items-center gap-2"
        style={{ borderColor: "var(--sand)", color: "var(--sea)" }}
      >
        <Icon name="Plus" size={16} />
        Добавить завершённый конкурс
      </button>

      <GroupTitle>🔜 Что будет дальше</GroupTitle>
      <Card>
        {data.upcoming.map((u, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={u}
              onChange={(e) => update({ upcoming: data.upcoming.map((x, j) => (j === i ? e.target.value : x)) })}
              className="flex-1 rounded-xl px-4 py-3 outline-none border"
              style={{ borderColor: "var(--sand)", color: "var(--warm-dark)" }}
            />
            <button
              onClick={() => update({ upcoming: data.upcoming.filter((_, j) => j !== i) })}
              className="rounded-xl px-3 border"
              style={{ borderColor: "#C0392B", color: "#C0392B" }}
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={() => update({ upcoming: [...data.upcoming, ""] })}
          className="rounded-lg px-3 py-2 text-sm font-semibold border flex items-center gap-2"
          style={{ borderColor: "var(--sand)", color: "var(--sea)" }}
        >
          <Icon name="Plus" size={16} />
          Добавить анонс
        </button>
      </Card>

      <SaveBar
        dirty={dirty}
        onSave={async () => {
          await saveContent(adminKey, "contests", { ...data, upcoming: data.upcoming.filter((u) => u.trim()) });
          setDirty(false);
        }}
      />
    </div>
  );
}
