import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import AccountRow from './AccountRow';

import BigNumber from 'bignumber.js';

function AccountsTable() {
  const [collators, setCollators] = useState([]);
  useEffect(() => {
    if (!collators.length) {
      fetch(`https://raw.githubusercontent.com/Manta-Network/sparta/main/calamari.json`)
        .then(response => response.json())
        .then(setCollators)
        //.then((collators) => setCollators(collators.filter((c) => (BigNumber(c.balance.free).dividedBy(1e12) >= 400000 || BigNumber(c.balance.reserved).dividedBy(1e12) >= 400000 || c.status === 'invulnerable') && c.metrics.calamari.startsWith('https://'))))
        .catch(console.error);
    }
  }, [collators.length]);
  return (
    <>
      <Row>
        <h2>calamari collators</h2>
      </Row>
      <Row>
        <Tabs defaultActiveKey="eligible">
          {
            [...new Set(collators.map(c => c.status))].map((status) => (
              <Tab key={status} eventKey={status} title={status}>
                <Table striped size="sm">
                  <thead>
                    <tr>
                      <th>
                        collator
                      </th>
                      <th>
                        version
                      </th>
                      <th style={{textAlign:'center'}}>
                        status
                      </th>
                      <th style={{textAlign:'center'}}>
                        bond
                      </th>
                      <th style={{textAlign:'center'}}>
                        session
                      </th>
                      <th style={{textAlign:'center'}}>
                        sync
                      </th>
                      <th style={{textAlign:'center'}}>
                        alerts
                      </th>
                      <th style={{textAlign:'center'}}>
                        ssl
                      </th>
                      <th style={{textAlign:'center'}}>
                        up
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {collators.filter((c) => c.status === status).map((collator) => (<AccountRow key={collator.ss58} collator={collator} />))}
                  </tbody>
                </Table>
              </Tab>
            ))
          }
        </Tabs>
      </Row>
    </>
  );
}

export default AccountsTable;