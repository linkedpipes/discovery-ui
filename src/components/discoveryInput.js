import React from "react";
import DiscoveryInputPart from "./discoveryInputPart";
import {filter, compose, values} from 'ramda';

const typeFilter = (componentType) => compose(
    filter((c) => c.type == componentType),
    values,
);

const DiscoveryInput = ({components, ...props}) => (
    <div>
        <DiscoveryInputPart label="Data sources" componentType="datasource" components={typeFilter('datasource')(components)} {...props}/>
        <DiscoveryInputPart label="Transformers" componentType="transformer" components={typeFilter('transformer')(components)} {...props}/>
        <DiscoveryInputPart label="Applications" componentType="application" components={typeFilter('application')(components)} {...props}/>
    </div>
);

export default DiscoveryInput;