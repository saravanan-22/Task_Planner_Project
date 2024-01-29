import React, { useEffect, useState } from "react";
import { Card, CardBody, Container } from "react-bootstrap";
import Navbar from "./Navbar";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";
import { AppBar } from "@mui/material";

const TaskPlannerPage = () => {
  return (
    <>
      <section>
        <Navbar />
        <section className="mt-5">
          <Container fluid>
            <Card>
              <CardBody>
                <section>
                  <AddTask />
                  <AllTasks />
                </section>
              </CardBody>
            </Card>
          </Container>
        </section>
      </section>
    </>
  );
};

export default TaskPlannerPage;
