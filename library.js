document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const booksContainer = document.getElementById('booksContainer');
    const myBooksContainer = document.getElementById('myBooksContainer');
    const logoutButton = document.getElementById('logoutButton');
    const myBooksButton = document.getElementById('myBooksButton');
    const allBooksButton = document.getElementById('allBooksButton');

    let books = [
        { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, available: true },
        { id: 2, title: "1984", author: "George Orwell", year: 1949, available: true },
        { id: 3, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, available: true },
        { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, available: true },
        { id: 5, title: "Moby Dick", author: "Herman Melville", year: 1851, available: true }
    ];

    let borrowedBooks = [];

    function displayBooks(booksToShow, container, isBorrowed = false) {
        container.innerHTML = '';
        booksToShow.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-item');
            bookElement.innerHTML = `
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>Year: ${book.year}</p>
                    ${isBorrowed ? `<p class="due-date">Due: ${book.dueDate}</p>` : ''}
                </div>
                <div class="book-actions">
                    ${isBorrowed 
                        ? `<button class="btn-return" data-id="${book.id}">Return</button>`
                        : book.available 
                            ? `<button class="btn-borrow" data-id="${book.id}">Borrow</button>`
                            : `<span>Unavailable</span>`
                    }
                </div>
            `;
            container.appendChild(bookElement);
        });
    }

    function searchBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.year.toString().includes(searchTerm)
        );
        displayBooks(filteredBooks, booksContainer);
    }

    function borrowBook(id) {
        const book = books.find(b => b.id === id);
        if (book && book.available) {
            book.available = false;
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 14); // 2 weeks from now
            const borrowedBook = {...book, dueDate: dueDate.toDateString()};
            borrowedBooks.push(borrowedBook);
            displayBooks(books, booksContainer);
            alert(`You have borrowed "${book.title}". It is due on ${borrowedBook.dueDate}.`);
        }
    }

    function returnBook(id) {
        const bookIndex = borrowedBooks.findIndex(b => b.id === id);
        if (bookIndex !== -1) {
            const book = borrowedBooks[bookIndex];
            borrowedBooks.splice(bookIndex, 1);
            const originalBook = books.find(b => b.id === id);
            originalBook.available = true;
            displayBooks(borrowedBooks, myBooksContainer, true);
            displayBooks(books, booksContainer);
            alert(`You have returned "${book.title}". Thank you!`);
        }
    }

    booksContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-borrow')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            borrowBook(id);
        }
    });

    myBooksContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-return')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            returnBook(id);
        }
    });

    searchButton.addEventListener('click', searchBooks);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchBooks();
        }
    });

    myBooksButton.addEventListener('click', (e) => {
        e.preventDefault();
        booksContainer.style.display = 'none';
        myBooksContainer.style.display = 'block';
        displayBooks(borrowedBooks, myBooksContainer, true);
        setActiveNavButton(myBooksButton);
    });

    allBooksButton.addEventListener('click', (e) => {
        e.preventDefault();
        myBooksContainer.style.display = 'none';
        booksContainer.style.display = 'block';
        displayBooks(books, booksContainer);
        setActiveNavButton(allBooksButton);
    });

    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Logging out... You would be redirected to the login page.');
        // In a real application, you would clear session data here
        window.location.href = 'index.html';
    });

    function setActiveNavButton(activeButton) {
        [allBooksButton, myBooksButton].forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // Initially display all books
    displayBooks(books, booksContainer);
});