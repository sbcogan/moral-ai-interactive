import React from 'react'
import {
          Card,
          Image,
          List
        } from 'semantic-ui-react'

import {iconList as icons, translationList,featureList} from '../DilemmaMaker'



export default props => {
  const {
        person,
        currentChosen,
        makeSelection,

        showingFeatures,

        icons
      } = props

  return (
    <Card.Group itemsPerRow = "2">
      {person.map((d,i)=>(
        <PersonCard
         person={d}
         chosen={currentChosen[i]}
         makeSelection={makeSelection}
         showingFeatures={showingFeatures}
         key={"personcard"+i}
         />
      ))
    }
  </Card.Group>
  )
}


const PersonCard = props => {
  const {features} = props.person
  const {gender,name,age,img,} = features
  const {makeSelection, chosen,showingFeatures} = props
  let color
  if (chosen > 0.5)  color = "rgba(95, 178, 180," +chosen+")"
  else if (chosen === 0)  color = "white"
  else if (chosen < 0.5)  color = "rgba(175, 98, 140," +chosen+")"
  console.log(translationList["age"](20))
  return (


    <Card style={{backgroundColor:color}}>
      <Card.Content>
        <Image
          floated="right"
          height="70px"
          src={img}/>
      <Card.Header>{name}</Card.Header>
      <Card.Description>
        <List

          duration={200}
          divided
          size='huge'
          verticalAlign='middle'
          >

          {["age","gender"].concat(showingFeatures).map((d,i)=>(

            <List.Item key = {d}>


              <List.Content>

                <List.Header>
                  <Image avatar>{icons[d]}</Image>
                  {translationList[d](features[d])}
                </List.Header>
                <List.Description>
                    {featureList[d]}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>




      </Card.Description>

        </Card.Content>
    </Card>

)}
