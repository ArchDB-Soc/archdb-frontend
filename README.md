# IADB frontend

The Integrated Archaeological Database (IADB) enables archaeologists to record details from an excavation and to develop interpretations of what they have found.

The Berkshire Archæological Society, the University of Reading and the York Archaeological Trust have been using IADB 2017. This is likely to be deprecated by 2025.

This project is to help them explore options for developing a new IADB from scratch. It uses sample data only.

* It uses React. Vanilla JavaScript might be even easier to maintain, but it would have been more difficult to generate a quick proof of concept.
* Likewise, it uses Chakra. The additional tradeoff for fast upfront development time here is possible slow performance. However, given that all users are "internal", some lag is acceptable.
* Performance is improved as it is an SPA. React Router is used to manage routes.
* Bearer tokens are stored to local storage. This isn't the most secure approach and would need to move to a cookie as use of the service scales.