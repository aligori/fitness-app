FROM mysql:8.0

COPY . /docker-entrypoint-initdb.d/

# The /docker-entrypoint-initdb.d/ directory is a specific directory recognized by the official MySQL Docker image. Any SQL scripts placed in this directory are automatically executed by the MySQL container during its initialization process.