import { LoadedPage } from '@/types';
import { t } from 'i18next';
import {useTranslation} from "next-i18next";
import Language from './language/Language';

type Props = {
  activePageSetter: (page: LoadedPage) => void,
  addItemModalSetter : (bool: boolean) => void,
};

const Header: React.FC<Props> = ({activePageSetter, addItemModalSetter}: Props) => {
  const { t } = useTranslation();
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        Lenderr
      </a>
      <nav className="nav justify-content-center">
        <button
          className="nav-link px-4 fs-5 text-white bg-transparent"
          style={{border: "none"}}
          onClick={() => activePageSetter("HOME_PAGE")}
        >
          Home
        </button>

        <button
          className="nav-link px-4 fs-5 text-white bg-transparent"
          style={{border: "none"}}
          onClick={() => activePageSetter("PROFILE_OVERVIEW")}
        >
          {t('header.tags.profile')}
        </button>

        <button
          className="nav-link px-4 fs-5 text-white bg-transparent"
          style={{border: "none"}}
          onClick={() => activePageSetter("OWNED_ITEMS")}
        >
          {t('header.tags.items')}
        </button>

        <button 
          // TODO: Spacing needs to be done better
          className="nav-link px-4 fs-5 text-white bg-transparent"
          style={{border: "none"}}    // Yes, I can't find another way to do this
          onClick={() => {addItemModalSetter(true)}}
        >
          {t('header.tags.addItem')}
        </button>

        <button 
          // TODO: Spacing needs to be done better
          className="nav-link px-4 fs-5 text-white bg-transparent"
          style={{border: "none"}}    // Yes, I can't find another way to do this
          onClick={() => {
            localStorage.removeItem('loggedInProfile');
            window.location.reload();
          }}
        >
          {t('header.tags.addItem')}
        </button>
        <Language/>
      </nav>
    </header>
  );
};

export default Header;