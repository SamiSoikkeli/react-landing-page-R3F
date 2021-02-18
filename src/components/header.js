import React from "react";

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <a className='logo' href='/'>notYAMAHA.</a>
        <nav>
          <ul>
            <li>
              <a href='/'>discover</a>
            </li>
            <li>
              <a href='/'>bikes</a>
            </li>
            <li className='btn'>
              <a href='/'>buy</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
