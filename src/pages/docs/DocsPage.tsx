import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './DocsPage.module.css';

import readmeMd from '@/dev/docs/README.app.md?raw';
import todoMd from '@/dev/docs/TODO.app.md?raw';
import contributingMd from '@/dev/docs/CONTRIBUTING.app.md?raw';

type DocKey = 'readme' | 'todo' | 'contributing';

export function DocsPage() {
  const [doc, setDoc] = useState<DocKey>('readme');

  const content = useMemo(() => {
    switch (doc) {
      case 'readme':
        return readmeMd;
      case 'todo':
        return todoMd;
      case 'contributing':
        return contributingMd;
      default:
        return readmeMd;
    }
  }, [doc]);

  return (
    <div id="main-content" className={styles.docsPage}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>Docs</h2>
          <p className={styles.subtitle}>
            Documentación interna del proyecto (README / TODO / Contributing).
          </p>
        </div>

        <div
          className={styles.controls}
          role="group"
          aria-label="Seleccionar documento"
        >
          <button
            type="button"
            className={`${styles.tab} ${doc === 'readme' ? styles.active : ''}`}
            onClick={() => setDoc('readme')}
          >
            README
          </button>
          <button
            type="button"
            className={`${styles.tab} ${doc === 'todo' ? styles.active : ''}`}
            onClick={() => setDoc('todo')}
          >
            TODO
          </button>
          <button
            type="button"
            className={`${styles.tab} ${doc === 'contributing' ? styles.active : ''}`}
            onClick={() => setDoc('contributing')}
          >
            Contributing
          </button>
        </div>
      </header>

      <section className={styles.panel}>
        <article className={styles.markdown}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </section>

      <details className={styles.details}>
        <summary className={styles.summary}>
          Click para ver notas técnicas del viewer
        </summary>
        <div className={styles.detailsBody}>
          <ul>
            <li>
              Render con <code>react-markdown</code> + <code>remark-gfm</code>.
            </li>
            <li>
              Estilos de Markdown controlados por tokens: superficies, texto,
              bordes y spacing.
            </li>
            <li>
              Archivos embebidos con <code>?raw</code> para evitar fetch y
              mantener la app offline-friendly.
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
}
