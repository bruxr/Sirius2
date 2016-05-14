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
                isFetching: state.get('isFetching'),
                contracts: state.get('items')
            });
        });
        this.context.store.dispatch(fetchContracts());
    }

    render() {
        return (
            <div className="project-contracts">
                <header className="page-header">
                    <h2 className="page-header">Contracts</h2>
                    <p>Manage contracts, invoices and other financial aspects of your project here.</p>
                </header>

                <a href="#" className="pure-button pure-button-primary" onClick={this.newContract}>New Contract</a>

                <div className="contracts-list">
                    {this.state.contracts.map((contract) => {
                        <Contract id={contract.get('id')}
                                  name={contract.get('name')}
                                  desc={contract.get('description')}
                                  amount={contract.get('amount')}
                                  time={contract.get('time')}
                                  allottedTime={contract.get('allotedTime')}
                                  rate={contract.get('rate')}
                                  rateType={contract.get('rateType')}
                                  invoices={contract.get('invoices')}
                                  startedAt={contract.get('startedAt')}
                                  endedAt={contract.get('endedAt')} />  
                    })}
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