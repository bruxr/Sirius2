import React from 'react';
import Contract from './contract.jsx';
import { newContract, fetchContracts } from '../actions/contracts';

export default class Contracts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            contracts: []
        }

        this.newContract = this.newContract.bind(this);
    }

    componentDidMount() {
        this.context.store.subscribe(() => {
            const state = this.context.store.getState().contracts;
            this.setState({
                isFetching: state.isFetching,
                contracts: state.items
            });
        });
        this.context.store.dispatch(fetchContracts());
    }

    render() {
        let contracts = [];
        for (let i = 0; i < this.state.contracts.length; i++) {
            let contract = this.state.contracts[i];
            contracts.push(<Contract
                  key={contract.id}
                  id={contract.id}
                  name={contract.name}
                  desc={contract.description}
                  amount={contract.amount}
                  time={contract.time}
                  allottedTime={contract.allotedTime}
                  rate={contract.rate}
                  rateType={contract.rateType}
                  invoices={contract.invoices}
                  startedAt={contract.startedAt}
                  endedAt={contract.endedAt} />
            );
        }
        return (
            <div className="project-contracts">
                <header className="page-header">
                    <h2 className="page-header">Contracts</h2>
                    <p>Manage contracts, invoices and other financial aspects of your project here.</p>
                </header>

                <a href="#" className="pure-button pure-button-primary" onClick={this.newContract}>New Contract</a>

                <div className="contracts-list">
                    {contracts}
                </div>
            </div>
        )
    }

    newContract(e) {
        e.preventDefault();
        this.context.store.dispatch(newContract());
    }

}

Contracts.contextTypes = {
    store: React.PropTypes.object
}