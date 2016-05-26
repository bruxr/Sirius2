import React from 'react';

export default class Repository extends React.Component {

    render() {
        return (
            <section className="project-section project-section_snapshots">
                <h2>Snapshots</h2>
                <table className="table table-bordered">
                    <thead className="thead-default">
                        <tr>
                            <th scope="col">Filename</th>
                            <th scope="col">Date</th>
                            <th scope="col">Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><a href="#">192835-050216-snapshot.zip</a></th>
                            <td>May 2 2016</td>
                            <td>1.2 MB</td>
                        </tr>
                        <tr>
                            <th scope="row"><a href="#">192835-050416-snapshot.zip</a></th>
                            <td>May 4 2016</td>
                            <td>1.3 MB</td>
                        </tr>
                        <tr>
                            <th scope="row"><a href="#">192835-050616-snapshot.zip</a></th>
                            <td>May 6 2016</td>
                            <td>1 MB</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        );
    }
    
}