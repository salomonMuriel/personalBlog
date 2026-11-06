---
name: Salomón Muriel
description: An operations report on warm office paper, ruled in ink and marked up in red.
colors:
  papel: "#f2f1ed"
  papel2: "#e9e8e2"
  campo: "#ffffff"
  tinta: "#16171a"
  panel: "#17181c"
  panelfg: "#eceae4"
  panelgris: "#9a988f"
  gris: "#65665f"
  linea: "#cfcdc4"
  linea2: "#a8a69c"
  rojo: "#d8332a"
  rojo2: "#b3251d"
  rojo3: "#ea4b3e"
  panelborde: "#2c2e34"
  panelborde2: "#232529"
  panelnota: "#8e8d86"
  paneltxt: "#b0aea6"
  panelhondo: "#101115"
typography:
  display-condensed:
    fontFamily: "Archivo Variable, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.9rem, 9.2vw, 5.8rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "0.005em"
    fontVariation: "'wdth' 62, 'wght' 900"
  display-painted:
    fontFamily: "Alfa Slab One, Rockwell, Georgia, serif"
    fontSize: "clamp(1.7rem, 5.3vw, 3.35rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Archivo Variable, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 104"
  title:
    fontFamily: "Archivo Variable, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 2.6vw, 1.85rem)"
    fontWeight: 700
    lineHeight: 1.14
    letterSpacing: "-0.028em"
  body:
    fontFamily: "Archivo Variable, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "10.5px"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0.16em"
  handwritten:
    fontFamily: "Caveat Variable, Caveat, Segoe Script, cursive"
    fontSize: "clamp(1.2rem, 3.2vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.2
rounded:
  DEFAULT: "2px"
  photo: "1px"
  none: "0"
spacing:
  page-gutter: "clamp(1.25rem, 4vw, 3.5rem)"
  section-y: "clamp(3.2rem, 7vw, 5.6rem)"
  section-y-compact: "clamp(2.6rem, 5.5vw, 4.4rem)"
  header-gap: "clamp(1.8rem, 3.6vw, 2.8rem)"
components:
  button-primary:
    backgroundColor: "{colors.rojo2}"
    textColor: "#ffffff"
    rounded: "{rounded.DEFAULT}"
    padding: "14px 20px"
  button-primary-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "#ffffff"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.DEFAULT}"
    padding: "14px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.papel2}"
    textColor: "{colors.tinta}"
  button-nav:
    backgroundColor: "{colors.rojo2}"
    textColor: "#ffffff"
    rounded: "{rounded.DEFAULT}"
    padding: "8px 14px"
  card-sheet:
    backgroundColor: "{colors.campo}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.DEFAULT}"
    padding: "20px"
  contact-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.panelfg}"
    rounded: "{rounded.none}"
  contact-row-hover:
    backgroundColor: "{colors.rojo2}"
    textColor: "#ffffff"
  toggle-pressed:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
---

# Design System: Salomón Muriel

## Overview

**Creative North Star: "The Operations Report"**

Every page is a filled-in work order from a small Bogotá practice: a ruled header strip that says *Operations report* with today's date, a sheet of warm grey office paper under a fixed film of grain, form sections stamped in mono capitals on heavy ink rules, and the consultant's red pen in the margin. The visual vocabulary is borrowed from documents a traditional business already handles: check sheets, fault logs, Gantt-style job schedules, packing lists, perforated tickets, a dictionary entry, a sign-painter's lettering. Nothing reads as a startup landing page.

Density is that of a working document: hairline rules between rows, mono metadata beside every item, generous left-aligned text measures, and almost no decoration that is not also a form element. Color is restrained to paper, ink and one red family; red marks what matters (underlines, checkmarks, the call to action, the pen), and a near-black panel closes each page as the sign-off sheet.

Motion is short and paper-like: rows rise 14px into place in a stagger, red underlines draw themselves under key phrases, schedule bars extend from the left, and a mono ticker runs along an ink band. Everything collapses to static under reduced motion.

**Key Characteristics:**
- Warm paper ground (papel) with a fixed multiply grain overlay across the whole viewport.
- Ink rules as structure: 2.5px over every section header, 1px hairlines between rows.
- One red family, three steps, each with a fixed job.
- Four typefaces with strict roles: condensed Archivo, sign-painted Alfa Slab, Plex Mono labels, Caveat red pen.
- Square, document-like shapes (2px corners), no pill shapes.
- A dark contact panel ends every page.

## Colors

Office paper and printer ink, with a red pen; the only chroma on the site is red.

### Primary
- **Signal Red** (rojo): the marker. Underline sweeps under key phrases, checked check-sheet boxes, active nav underline, the bar beside the portrait, list bullets in prose, blockquote rule, focus ring, text selection, live (dashed, marching) wires in the board.
- **Pen Red** (rojo2): the darker, text-safe red. Every primary button and its nav variant, handwritten notes, links in prose, numbered labels (`Falla 01`), occupied-slot numerals, dashed "today" boxes.
- **Lamp Red** (rojo3): the red that survives on dark. Mono labels and ticker separators on the ink band and the dark panel only.

### Neutral
- **Office Paper** (papel): page background and the fill behind board chips; the sticky nav uses it at 90% with a 10px blur.
- **Second Sheet** (papel2): alternate section ground (capacity section between two linea borders), secondary-button hover, inline code.
- **Form Field White** (campo): raised sheets on the paper: dictionary card, photo mats, board boxes, checkboxes, capacity card.
- **Ink** (tinta): text, header rules, the ticker band and top strip, the "connected" state of the board, pressed toggle.
- **Pencil Grey** (gris): secondary text, notes beside rótulos, mono metadata.
- **Hairline** (linea): row dividers, card borders, photo mats.
- **Heavy Hairline** (linea2): outlined buttons, checkbox and box borders, empty slot squares, outline lettering.
- **Night Panel** (panel) with its own surfaces: panelfg (text), paneltxt (body), panelgris and panelnota (mono notes, chosen for contrast at 10px), panelborde and panelborde2 (row rules), panelhondo (deepest well).

### Named Rules
**The Red Pen Rule.** Red is never a background for a section or a decorative fill. It appears as a mark (underline, check, rule, bar), as handwriting, or as the solid fill of the main conversion action (the questionnaire, or WhatsApp where it stands alone).

**The Right Red Rule.** rojo for marks and strokes, rojo2 for text and filled buttons on light ground, rojo3 only on panel or tinta. Don't swap them.

## Typography

**Display Font:** Archivo Variable, using the wdth axis (Helvetica Neue, Arial fallback)
**Painted Display:** Alfa Slab One (Rockwell, Georgia fallback)
**Label/Mono Font:** IBM Plex Mono 400/500/600
**Handwriting:** Caveat Variable

**Character:** A grotesque that stretches from poster-condensed to slightly wide does the talking; a slab in sign-painter dress gives the hero its shopfront voice; mono capitals do the paperwork; Caveat is the consultant writing on the report.

### Hierarchy
- **Display, condensed** (900, clamp(2.9rem, 9.2vw, 5.8rem), 0.84, wdth 62, uppercase): hero first line only. The contact title uses the same family at wdth 70 and up to 7.4rem; contact channel rows at wdth 78.
- **Display, painted** (Alfa Slab 400, clamp(1.7rem, 5.3vw, 3.35rem), 0.98, uppercase, painted treatment): hero second line only. Paper-colored fill, ink stroke, a red then ink hard double drop. Also the dictionary headword (unpainted).
- **Headline** (800, clamp(1.9rem, 4.4vw, 3.4rem), 1.03, -0.028em, wdth 104, max 16-20ch): every section h2. Page h1s use the same recipe up to 4.2rem.
- **Title** (700, clamp(1.25rem, 2.6vw, 1.85rem), 1.14, wdth 98): row statements in fault logs and lists, max ~30ch.
- **Body** (400, 17px base, 1.55): measures held at 44-58ch; lead paragraphs step to clamp(1.06rem, 1.7vw, 1.26rem).
- **Label** (Plex Mono, 10.5-11px, uppercase, 0.13-0.2em tracking, 500-600): rótulos, item numbers, metadata, captions, ticker, footer line.
- **Handwritten** (Caveat, 1.18-1.65rem, 1.2-1.3, rojo2, rotated -1° to -1.4° from the left edge): the margin note.

### Named Rules
**The Width Axis Rule.** Hierarchy in Archivo is carried by the wdth axis as much as by size: condensed (62-84%) for shouts and numerals, 98-104% for headlines and statements. Archivo is imported with the wdth axis; never swap to a static cut.

**The One Painted Line Rule.** The painted slab treatment appears once per surface, in the hero. It is a sign, not a style.

**The Mono Is Paperwork Rule.** Plex Mono is always small, uppercase and tracked. It labels; it never carries sentences of persuasion.

## Layout

One page width (1320px max, gutter clamp(1.25rem, 4vw, 3.5rem)) repeats in every section; the contact channel rows break out to full bleed and reuse the gutter as padding. Sections stack vertically on papel with vertical padding of clamp(3.2rem, 7vw, 5.6rem), or clamp(2.6rem, 5.5vw, 4.4rem) for compact ones; alternation is by ground (papel, papel2 with linea borders, panel) rather than cards.

Within a section, the order is fixed: header strip, h2, content. Content grids are asymmetric two-column at lg (roughly 1.3fr / 1fr, or text plus a 300px aside) and row-based lists use a three-column form grid at md: a 9.5rem mono metadata column, the statement, and the note. Everything collapses to one column on mobile; the 375px and 1440px widths are the verification points. A 16-column grid utility exists for the board. Text is left-aligned throughout; the only right-aligned element is the rótulo note at sm and up.

**The Ruled Form Rule.** Lists are rows separated by 1px linea hairlines inside a bordered block, never grids of floating cards.

## Elevation & Depth

Flat paper by default. Depth comes from stacking sheets: campo white on papel with a 1px or 1.5px border. One soft "sheet lift" shadow exists, used three times on the most important raised sheet of a section (hero dictionary card, the central board box, the check-sheet panel): a 1px contact line plus a long, tight, negatively spread drop (`0 1px 0 rgba(22,23,26,.05), 0 16px 36px -28px rgba(22,23,26,.55)`, with two slight variants). The only hard shadow is typographic, inside the painted hero line, which is the sign-painter's world showing through.

**The Sheet Lift Rule.** At most one lifted sheet per section; every other surface lies flat with a border.

## Shapes

Corners are 2px everywhere (the `rounded` default), photos 1px inside their mat, panels and bands square. Borders do the shaping: 2.5px ink rules over headers, 1.5px outlines on buttons, boxes and checkboxes, 1px hairlines between rows, dashed rojo2 for the broken "today" state and dashed linea2 for an unavailable slot. Photos sit in a campo mat with 6-9px padding, slightly desaturated (grayscale .14-.16). Recurring silhouettes: the perforated tear edge (scalloped 12px repeat) between a ticket and its stub, slot squares (20px, filled ink for taken), and the outline-only lettering variant.

## Components

### Section header (rótulo + nota + título)
The work order's form-section designation. A 2.5px tinta rule across the full width, with 12px top padding; on its left a Plex Mono label (11px, 600, uppercase, 0.2em) naming the document type (*Registro de fallas*, *Hoja de chequeo*, *Programa de obra*, *Lista de empaque*); on its right at sm and up an optional 13px gris note, right-aligned, capped at ~40-42ch. Below it, the Archivo headline h2. Page headers repeat the same strip, then the h1, then an optional handwritten line, then a lead.

### Handwritten note
The red pen. Caveat in rojo2, 1.18-1.65rem, rotated -1° to -1.4° with transform-origin left, placed in the margin column of a row or directly under a headline. It comments on the printed text in the first person; it is never the only carrier of essential information.

### Buttons
- **Shape:** squared (2px), inline-flex with a right arrow or down arrow SVG at 18px, 0.97rem bold Archivo.
- **Primary:** rojo2 fill, white text, 14px 20px. Used for the main conversion action only: the questionnaire, paired with an outlined WhatsApp button (`ParCta`), or WhatsApp where it stands alone.
- **Hover / Active:** fill turns tinta; active nudges down 1px. Focus is the global 2.5px rojo outline at 3px offset.
- **Secondary:** transparent with a 1.5px linea2 border, same padding; hover darkens the border to tinta and fills papel2. Used for in-page jumps.
- **Nav variant:** the primary at 12.5px, 8px 14px, permanently in the sticky nav.
- **Text link:** rojo2, 600, 1.5px currentColor bottom border; hover to tinta.

### Cards / Sheets
- **Corner Style:** 2px.
- **Background:** campo on papel or papel2.
- **Shadow Strategy:** flat, except the one sheet lift per section.
- **Border:** 1px linea, or 1.5px linea2 for a form card.
- **Internal Padding:** 16-24px.

### Check sheet (Chinómetro)
Square 1.4rem checkboxes in campo with a 1.6px linea2 border; hover border rojo; checked fills rojo with a white tick tilted -8° that pops in. The whole row tints faint red and its label is struck through in red. A gauge needle swings on a springy curve.

### Navigation
A tinta top strip (36px, mono 10.5px, rojo3 report label, panelgris date) sits above a sticky 60px nav on papel at 90% with backdrop blur, gaining a linea bottom border once scrolled. Wordmark in mono with a rojo2 period. Links 14px semibold gris with a 1.5px underline that turns rojo on hover and current page. On mobile the links move to a horizontally scrolling mono row under the bar.

### Ticker band
A full-bleed tinta band with a mono uppercase marquee in panelfg (46s loop); the logo belt runs the opposite way more slowly, edge-faded and pausing on hover.

### Dark contact panel
Ends every page. panel ground, a giant condensed Archivo title (wdth 70, up to 7.4rem) beside a paneltxt lead. Then four full-bleed channel rows: mono number, condensed uppercase channel name up to 3.2rem, mono note, and an arrow that slides 8px right; the whole row floods rojo2 on hover. Then a three-column footnote grid with rojo3 mono labels and a mono colophon line in panelnota.

### Toggle and board (Tablero de cajitas)
A segmented 1.5px tinta control; the pressed segment is tinta on papel. The board switches between *today* (dashed rojo wires marching, rojo2 chips, dashed red boxes) and *connected* (solid ink wires, dimmed retired boxes, an ink-topped panel note).

## Do's and Don'ts

### Do:
- **Do** open every section with the header strip: 2.5px tinta rule, mono document-type label, optional gris note, then the Archivo h2.
- **Do** keep red for marks, handwriting and the main conversion action, using rojo, rojo2 and rojo3 for their assigned jobs.
- **Do** express hierarchy in Archivo through the wdth axis (62-84% condensed for shouts and numbers, 98-104% for headlines).
- **Do** build lists as hairline-ruled rows with a mono metadata column.
- **Do** close every page with the dark contact panel.
- **Do** use the existing hand-made utilities (grain, ruled lines, painted, underline sweep, checkbox, row, perforation, ticker, reveal, wire, toggle, bar, page width) instead of re-creating them with loose utilities.
- **Do** put three adjacent inline fragments (text, link or underline, text) in one `set:html` string. In Astro a line break inside an `<a>` or between expressions becomes a space: underlines swallow the next space and commas detach.
- **Do** treat the Tablero de cajitas markup as a contract with its script: the wires are drawn from each box's `offsetLeft`/`offsetTop`, so box `id`s, their order and the `data-a`/`data-b`/`data-r` attributes must not change, and its geometry is not to be redrawn.
- **Do** honor reduced motion for every new animation, as the existing ones do.

### Don't:
- **Don't** use rojo3 on paper or rojo2 on the dark panel.
- **Don't** use the painted slab treatment outside the hero line.
- **Don't** round corners past 2px or introduce pill buttons.
- **Don't** stack floating shadowed cards in grids; raise at most one sheet per section.
- **Don't** introduce a new hue, gradient fill or tinted section background beyond papel, papel2, campo, tinta and panel.
- **Don't** set persuasion or body sentences in Plex Mono, or use the mono label as a slogan above a headline that repeats it.
- **Don't** load a static Archivo cut or drop the wdth axis import.
