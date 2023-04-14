import React from "react";
import { useTable } from "react-table"
import styles from "./table.module.css"
import { FiTrash } from "react-icons/fi"
import applyPenalty from "@/app/src/applyPenalty";
import useLocalStorage from "@/app/src/useLocalStorage";
export default function Table({ data, timeList, set }) {
    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'index', // accessor is the "key" in the data
            },
            {
                Header: 'Time',
                accessor: 'formattedTime', // accessor is the "key" in the data
            },
            // {
            //     Header: 'Scramble',
            //     accessor: 'scramble',
            // },
            {
                Header: 'mo3',
                accessor: 'mo3',
            },
            {
                Header: 'ao5',
                accessor: 'ao5',
            },
            {
                Header: 'ao12',
                accessor: 'ao12',
            },
            {
                Header: 'Operations',
                accessor: 'operations',
            },
        ],
        []
    )

    let session = "Session 1"
    let doPenalty = (i, penalty) => {
        set(prevTimeList => {
            let newTimeList = structuredClone(prevTimeList)
            newTimeList[session][i].penalty = penalty;
            newTimeList[session][i].formattedTime = applyPenalty(newTimeList[session][i].time, penalty)
            let mathematicalTime = newTimeList[session][i].time
            if (penalty === "DNF") mathematicalTime = -1;
            if (penalty === "+2") mathematicalTime = newTimeList[session][i].time + 200
            newTimeList[session][i].mathematicalTime = mathematicalTime
            return newTimeList;
        })
    }

    let [_timeStatus, setTimeStatus] = useLocalStorage("timeStatus", "idle")
    let [_time, setTime] = useLocalStorage("curTime", 0)
    let [_penalty, setPenalty] = useLocalStorage("penalty", "OK")
    const tableInstance = useTable({
        columns, data: data.map((x, i) => {
            x.index = i + 1;
            x.operations = <span class={styles.opWrap}>
                <span class={[styles.trash].join(" ")} onClick={() => {
                    set(original => {
                        let newList = structuredClone(original);
                        newList["Session 1"].splice(i, 1)
                        return newList;
                    })
                    if (i === 0) {
                        setTime(0);
                        setPenalty("OK");
                        setTimeStatus("idle");
                    }
                }}>
                    <FiTrash />
                </span>
                <span class={[styles.selection, timeList[session][i] && timeList[session][i].penalty === "OK" ? styles.selected : null].join(" ")} onClick={() => {
                    doPenalty(i, "OK")
                }}>
                    OK
                </span>
                <span class={[styles.selection, timeList[session][i] && timeList[session][i].penalty === "+2" ? styles.selected : null].join(" ")} onClick={() => {
                    doPenalty(i, "+2")
                }}>
                    +2
                </span>
                <span class={[styles.selection, timeList[session][i] && timeList[session][i].penalty === "DNF" ? styles.selected : null].join(" ")} onClick={() => {
                    doPenalty(i, "DNF")
                }}>
                    DNF
                </span>
            </span>
            return x
        }).reverse()
    })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table} {...getTableProps()}>
                <thead>
                    {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()} key={column.getHeaderProps().key}>
                                            {// Render the header
                                                column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                        rows.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()} key={row.getRowProps().key}>
                                    {// Loop over the rows cells
                                        row.cells.map(cell => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()} key={cell.getCellProps().key}>
                                                    {// Render the cell contents
                                                        cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}