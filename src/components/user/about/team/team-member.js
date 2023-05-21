import React from 'react'
import { Card } from 'react-bootstrap'

const TeamMember = ({name, image, title}) => {
  return (
    <Card className="team-member">
      <Card.Img variant="top" src={require(`../../../../assets/img/team/${image}`)} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text><em>{title}</em></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TeamMember