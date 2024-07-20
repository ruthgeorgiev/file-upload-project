const db = require('../utils/database');

const getPics = (req, res) => {
    const rows = db.prepare('SELECT * FROM pictures').all();
    let links = rows.map(row => `
        <div>
            <a href="${row.path}" target="_blank">${row.name}</a>
            <button onclick="deletePic(${row.pic_id})">Delete</button>
        </div>
    `).join('<br>');
    res.send(`
        <div><h2>Uploaded Pictures:</h2>${links}</div>
        <script>
            function deletePic(pic_id) {
                fetch('/delete-pic/' + pic_id, { method: 'DELETE' })
                    .then(response => response.text())
                    .then(data => { 
                        if (data === 'Success') {
                            location.reload();
                        } else {
                            alert(data);
                        }
                    });
            }
        </script>
    `);
};

module.exports = {
    getPics
};
