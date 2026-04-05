import type { Lang } from "@i18n/ui";

interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
  lang?: Lang;
}

interface Props extends DatetimesProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className,
  lang = "en",
}: Props) {
  const updatedLabel = lang === "es" ? "Actualizado:" : "Updated:";
  const publishedLabel = lang === "es" ? "Publicado:" : "Published:";

  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
      </svg>
      {modDatetime && modDatetime > pubDatetime ? (
        <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
          {updatedLabel}
        </span>
      ) : (
        <span className="sr-only">{publishedLabel}</span>
      )}
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime
          pubDatetime={pubDatetime}
          modDatetime={modDatetime}
          lang={lang}
        />
      </span>
    </div>
  );
}

const FormattedDatetime = ({
  pubDatetime,
  modDatetime,
  lang = "en",
}: DatetimesProps) => {
  const myDatetime = new Date(
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime
  );

  const langTag = lang === "es" ? ["es-419"] : ["en-EN"];

  const date = myDatetime.toLocaleDateString(langTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <>
      <time dateTime={myDatetime.toISOString().slice(0, 10)}>{date}</time>
    </>
  );
};
