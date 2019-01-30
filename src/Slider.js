import html from './html.js';

export default props =>
  html`
    <div class="Slider">
      ${props.children.map(
        (child, index) =>
          html`
            <div hidden=${index !== props.index}>${child}</div>
          `,
      )}
      <p>
        ${props.children.map((child, index) => [
          html`
            <a
              onClick=${() => props.onSelect(index)}
              style=${index === props.index && {
                fontWeight: 'bold',
              }}
              >${index + 1}</a
            >
          `,
          ' ',
        ])}
      </p>
    </div>
  `;
