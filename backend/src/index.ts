import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to insert a user into the database
async function insertUser(email: string, password: string, fname: string, lname: string) {
  try {
    const res = await prisma.nikhil.create({
      data: {
        email,
        password,
        firstName: fname,
        lastName: lname,
      },
      select: {
        id: true,
        password: true,
        firstName: true,
        lastName: true,
      },
    });
    console.log("Inserted User:", res);
  } catch (err) {
    console.error("Error inserting user:", err);
  }
}

//insertUser("nikhil2@gmail.com", "123456", "nikhil2", "achale2");

// Interface for update parameters
interface UpdateParams {
  firstName: string;
  lastName: string;
}

// Function to update a user's first and last name by email
async function updateUser(email: string, { firstName, lastName }: UpdateParams) {
  try {
    const res = await prisma.nikhil.update({
      where: { email },
      data: {
        firstName,
        lastName,
      },
    });
    console.log("Updated User:", res);
  } catch (err) {
    console.error("Error updating user:", err);
  }
}

updateUser("nikhil2@gmail.com", {
  firstName: "nikhil2",
  lastName: "achale2",
});