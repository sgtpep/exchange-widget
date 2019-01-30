import html from './html.js';

export default props =>
  html`
    <div>
      ${props.children.map((child, index) => index === props.index && child)}
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
