from setuptools import setup, find_packages

setup(
    name="mysqlqueryai-frontend",
    version="0.1",
    packages=find_packages(),
    install_requires=[],
    entry_points={
        "console_scripts": [
            "start-mysqlqueryai-frontend=start_frontend:main",
        ],
    },
)