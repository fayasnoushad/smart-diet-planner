function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content min-h-[10vh] p-4">
      <aside>
        <Link
          href="https://www.gnu.org/licenses/agpl-3.0.en.html"
          target="_blank"
        >
          Copyright &copy; {new Date().getFullYear()} - Smart Diet Planner
          <br />
          GNU Affero General Public License v3 (GNU AGPL v3)
        </Link>
      </aside>
    </footer>
  );
}

export default Footer;
