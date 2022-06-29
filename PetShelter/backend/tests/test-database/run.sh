#sqlite3 '../../test.db' < select-breed.sql
# Create pet type
if $(sqlite3 '../../test.db' < pet-type.create.sql 2> /dev/null)
then echo "pet type created succesfull"
else
    echo "Something go wrong with pet type adding to test database"
fi

if $(sqlite3 '../../test.db' < pet-breed.create.sql 2> /dev/null)
then echo "pet breed created succesfull"
else
    echo "Something go wrong with pet breed adding to test database"
fi

if $(sqlite3 '../../test.db' < pet-size.create.sql 2> /dev/null)
then echo "pet size created succesfull"
else
    echo "Something go wrong with pet size adding to test database"
fi

if $(sqlite3 '../../test.db' < pet-gender.create.sql)
then echo "pet gender created succesfull"
else
    echo "Something go wrong with pet gender adding to test database"
fi
if $(sqlite3 '../../test.db' < pet-address.create.sql 2> /dev/null)
then echo "Address create successfull"
else
    echo "Something goes wrong while address create"
fi
if $(sqlite3 '../../test.db' < pet-center.create.sql 2> /dev/null)
then echo "pet ceters created succesfull"
else
    echo "Something go wrong with pet centers adding to test database"
fi

if $(sqlite3 '../../test.db' < pet.create.sql)
then echo "pet created succesfull"
else
    echo "Something go wrong with pet adding to test database"
fi

if $(sqlite3 '../../test.db' < pet-image.create.sql)
then echo "pet image created succesfull"
else
    echo "Something go wrong with pet images adding to test database"
fi