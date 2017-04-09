import React from 'react';
import Toolbar from 'react-md/lib/Toolbars'
import FontIcon from 'react-md/lib/FontIcons';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import { map, values, compose } from 'ramda';

const renderComponents = (toggleItem) => compose(
    map( (row, index) => (
        <TableRow key={index}>
            <TableColumn>
            </TableColumn>
            <TableColumn>{row.uri}</TableColumn>
        </TableRow>
    )),
);

const DiscoveryInputPart = (props) => (
    <div>
        <DataTable>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                    <TableColumn/>
                    <TableColumn tooltip="Uri">Uri</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody showRowHover displayRowCheckbox={false}>
                {renderComponents(props.toggleItem)(props.components)}
            </TableBody>
        </DataTable>
    </div>
);

export default DiscoveryInputPart;