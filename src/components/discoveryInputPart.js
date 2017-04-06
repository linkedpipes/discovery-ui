import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { map, values, compose } from 'ramda';
import { Checkbox } from 'material-ui';

const renderComponents = (toggleItem) => compose(
    map( (row, index) => (
        <TableRow key={index}>
            <TableRowColumn>
                <Checkbox onCheck={() => toggleItem(row.uri, row.active)}/>
            </TableRowColumn>
            <TableRowColumn>{row.uri}</TableRowColumn>
            <TableRowColumn>{row.label}</TableRowColumn>
        </TableRow>
    )),
    values,
);

const DiscoveryInputPart = (props) => (
    <div>
        <Toolbar>
            <ToolbarGroup>
                <ToolbarTitle text={props.label} />
                <FontIcon className="muidocs-icon-custom-sort" />
                <ToolbarSeparator />
            </ToolbarGroup>
        </Toolbar>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>
                    </TableHeaderColumn>
                    <TableHeaderColumn tooltip="URI">URI</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Label">Label</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody showRowHover>
                {renderComponents(props.toggleItem)(props.components)}
            </TableBody>
        </Table>
    </div>
);

export default DiscoveryInputPart;