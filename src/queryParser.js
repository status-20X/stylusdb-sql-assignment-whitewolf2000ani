function parseQuery(query) {
    const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
    const match = query.match(selectRegex);

    if (match) {
        const [, fields, table, whereString] = match;
        const whereClauses = whereString ? parseWhereClause(whereString) : [];
        return {
            fields: fields.split(',').map(field => field.trim()),
            table: table.trim(),
            whereClauses
        };
    } else {
        throw new Error('Invalid query format');
    }
}

function parseWhereClause(whereString) {
    if (!whereString.trim()) {
        return []; // No conditions, return an empty array
    }

    const conditions = whereString.split(/ AND | OR /i);
    try {
        return conditions.map(condition => {
            const [field, operator, value] = condition.split(/\s+/);
            if (!field || !operator || !value) {
                throw new Error('Invalid where clause format');
            }
            return { field, operator, value };
        });
    } catch (error) {
        throw new Error('Error parsing where clause: ' + error.message);
    }
}


module.exports = parseQuery;