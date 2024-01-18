export const proxy = (req, res) => {
    console.log(`Handled proxy route: ${req.path}`)

    res.send(req.path)
};

export const union = (req, res) => {
    console.log(`Handled union route: ${req.path}`)

    res.send(req.path)
};

export const first = (req, res) => {
    console.log(`Handled first route: ${req.path}`)

    res.send(req.path)
};
