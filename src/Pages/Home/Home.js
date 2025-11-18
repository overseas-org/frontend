

import './Home.css';
import Projects from '../projects/Projects';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useState } from 'react';
import MainConnections from '../MainConnections/MainConnector';
import Logout from '../../components/logout/Logout';

function Home() {
  const projects = <Projects/>;
  const connections = <MainConnections scope="account"/>;

  const [currentPage, setCurrentPage] = useState(projects);

  function setPage(page){
    if (page == "connectors"){
      page = connections;
    }
    else {
      page = projects;
    }
    setCurrentPage(page);
  }

  return (
        <main className="home">
          <Sidebar setPage={setPage} pages={["projects", "connectors"]}/>
          <div className='page-main'>
            {currentPage}
          </div>
        </main>
  );
}

export default Home;