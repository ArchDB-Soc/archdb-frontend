# ArchDB frontend

The Archaeological Database (ArchDB) enables archaeologists to record details from an excavation and to develop interpretations of what they have found.

This project is to help them share resources and records to create an integrated database that unifies records into the same common structure, thus allowing for new possibilities in terms of data analysis and modelling. 

We welcome contributions from other developers, data scientists and archeologists. Get credentials for ArchDB and see how to contribute [here](https://github.com/plabram/archdb-backend/blob/main/CONTRIBUTIONS.md).

Find the backend here: https://github.com/plabram/archdb-backend

* Priority has been given to being able to create a proof of concept built quickly. Hence, React and Chakra have been used. Ideally in future we'd eliminate the need for Chakra to improve performance.
* React Router is used to manage routes.
* Bearer tokens are stored to local storage. This isn't the most secure approach. Moving to cookies is on the roadmap (although not in active development).
* Although the app normally works well on mobile, mobile-only issues are not prioritised/supported. A computer is present for most field work.
* We used a free service (Render) for rollout, meaning initial data is slow to load. Because of this, lazy loading, memoization and other performance "tricks" need to be used to ensure the experience is as smooth as possible.
* Due to their nature, Sets and Sites have a limited number of results (~100 max). Records have potential to have thousands (or even 10,000s) of results and should be handled with care.
