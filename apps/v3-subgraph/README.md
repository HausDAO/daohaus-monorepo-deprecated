# DAOHaus v3 Subgraph

## Local development

TBD

#### Subgraph yaml generation

`nx run v3-subgraph:generate-config --network=goerli`

supported networks:

- goerli

#### Generate subgraph code

`nx run v3-subgraph:generate-code`

### Deployment

`nx run v3-subgraph:graph-deploy --name=hausdao/daohaus-v3-goerli`

suported names:

- hausdao/daohaus-v3-goerli

### License

The DAOhaus subgraphs are for querying data for Moloch DAOs built on the Moloch DAO framework smart contracts <https://github.com/HausDAO/Baal>.

Copyright (C) 2022 DAOhaus

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/gpl-3.0.txt>.
