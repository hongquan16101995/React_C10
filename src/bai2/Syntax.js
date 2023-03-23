function Syntax() {
    const user = {
        firstName: 'Harper',
        lastName: 'Perez'
    };

    const element = (
        <h1 style={{ textAlign: "center" }}>
            Hello, {formatName(user)}!
        </h1>
    );

    function formatName(user) {
        return user.firstName + ' ' + user.lastName;
    }

    return (element)
}

export default Syntax;
