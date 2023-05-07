import React from 'react'

export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright" lang="en">&copy; {currentYear} Mesto Russia</p>
    </footer>
  )
}
