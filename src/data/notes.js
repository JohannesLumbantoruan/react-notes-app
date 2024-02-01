let notes = [
    {
        id: 1,
        title: 'Babel',
        body: `Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.`,
        createdAt: new Date('2024-01-31').toISOString(),
        archived: false
    },
    {
        id: 2,
        title: 'Functional Component',
        body: 'Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.',
        createdAt: new Date('2024-01-31').toISOString(),
        archived: false
    },
    {
        id: 3,
        title: 'Modularization',
        body: 'Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.',
        createdAt: new Date('2024-01-31').toISOString(),
        archived: false
    },
    {
        id: 4,
        title: 'Lifecycle',
        body: 'Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya.',
        createdAt: new Date('2024-01-31').toISOString(),
        archived: false
    },
    {
        id: 5,
        title: 'ESM',
        body: 'ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.',
        createdAt: new Date('2024-01-31').toISOString(),
        archived: false
    },
    {
        id: 6,
        title: 'Module Bundler',
        body: 'Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.',
        createdAt: new Date('2024-01-31').toISOString(),
        archived: false
    }
];

function getNotes() {
    return notes.filter((note) => !note.archived);
}

function getArchivedNotes() {
    return notes.filter((note) => note.archived);
}

function getNote(id) {
    return notes.filter((note) => note.id === id)[0];
}

function addNote(note) {
    notes = [
        {
            ...note,
            id: +new Date(),
            createdAt: new Date().toISOString(),
            archived: false
        },
        ...notes
    ]
}

function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
}

function archiveNote(id) {
    notes = notes.map((note) => {
        if (note.id === id) {
            note.archived = true;
        }

        return note;
    });
}

function unArchiveNote(id) {
    notes = notes.map((note) => {
        if (note.id === id) {
            note.archived = false;
        }

        return note;
    });
}

export {
    getNotes,
    getArchivedNotes,
    addNote,
    deleteNote,
    archiveNote,
    unArchiveNote,
    getNote
};