export default function InformationBrowser() {
    //thuộc tính userAgent của navigator sẽ trả về thuộc tính của trình duyệt
    const name = navigator.userAgent

    const students = [
        {
            company: 'Alfreds Futterkiste',
            contact: 'Maria Anders',
            country: 'Germany'
        },
        {
            company: 'Centro comercial Moctezuma',
            contact: 'Francisco Chang',
            country: 'Mexico'
        }
    ]

    const element = (
        <div>
            <h2>{name}</h2>
        </div>
    )

    const element1 = (<div>
        {students.map(student => (
            <tr>
                <td>{student.company}</td>
                <td>{student.contact}</td>
                <td>{student.country}</td>
            </tr>
        ))}
    </div>)

    return (element1)
}
