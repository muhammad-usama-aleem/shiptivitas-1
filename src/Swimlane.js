import React from "react";
import Card from "./Card";
import Dragula from "dragula";
import "dragula/dist/dragula.css";
import "./Swimlane.css";

export default class Swimlane extends React.Component {
  componentDidMount() {
    Dragula([
      document.getElementById("backlog"),
      document.getElementById("process"),
      document.getElementById("complete"),
    ])
      .on("drag", function (e) {
        e.className += " ";
        console.log("drag", e.className);
      })
      .on("drop", function (e) {
        console.log("drop", e.className);

        // console.log(this.props.name);
        if (e.className === "Card Card-grey") {
          e.className = e.className.replace("Card Card-grey", "Card Card-blue");
        } else {
          e.className = e.className.replace(
            "Card Card-blue",
            "Card Card-green"
          );
        }
      });
  }

  render() {
    const cards = this.props.clients.map((client) => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status}
        />
      );
    });

    // dragcoulum for adding the dragula in the three rows.
    const dragcolumn = (internldata) => {
      return (
        <div
          className="Swimlane-dragColumn"
          id={internldata}
          ref={this.props.dragulaRef}
        >
          {cards}
        </div>
      );
    };

    return (
      <div className="Swimlane-column">
        <div className="Swimlane-title">{this.props.name}</div>

        {this.props.name === "Backlog" ? dragcolumn("backlog") : null}
        {this.props.name === "In Progress" ? dragcolumn("process") : null}
        {this.props.name === "Complete" ? dragcolumn("complete") : null}
      </div>
    );
  }
}
