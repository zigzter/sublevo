const renderInputErrors = (errors = [], name) => `
<p>
${ errors.filter(e => e.param === name)
        .map(e => e.msg)
        .join(', ')
}
</p>
`;
module.exports = {
    renderInputErrors,
};
