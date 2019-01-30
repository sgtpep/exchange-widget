import html from './html.js';

export default () =>
  html`
    <span class="RateDropdown">
      <span>current rate</span>
      <select>
        <option>rate 1</option>
        <option>rate 2</option>
      </select>
    </span>
  `;
