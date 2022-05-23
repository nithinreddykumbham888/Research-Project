const TableBody = ({ tableData, columns, searchType, searchTerm, showPdf }) => {
    return (
        <tbody>
            {tableData.map((data) => {
                console.log(searchType)
                console.log(searchTerm)
                if (searchTerm == "" || data[searchType].toLowerCase().includes(searchTerm.toLowerCase()))
                    return (
                        <tr >
                            {columns.map(({ accessor }) => {
                                if (accessor == 'Pdf')
                                    return <td> <button onClick={() => showPdf(data[accessor])}>View Pdf </button></td>;
                                const tData = data[accessor] ? data[accessor] : "——";
                                return <td key={accessor}>{tData}</td>;
                            })}
                        </tr>
                    );
            })}
        </tbody>
    );
};

export default TableBody;
