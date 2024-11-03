import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        Lenderr
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>
        <Link href="/profile" className="nav-link px-4 fs-5 text-white">
          My profile
        </Link>
        <button 
          // TODO: Spacing needs to be done better
          className="nav-link px-4 fs-5 text-white bg-transparent"
          style={{border: "none"}}    // Yes, I can't find another way to do this
          onClick={() => {
            localStorage.removeItem('loggedInProfile');
            window.location.reload();
          }}
        >
          Log out
        </button>
      </nav>
    </header>
  );
};

export default Header;