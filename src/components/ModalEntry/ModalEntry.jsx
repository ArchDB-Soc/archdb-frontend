import {
  Input,
  Stack,
  Text
} from "@chakra-ui/react";


const ModalEntry = ({ data }) => {

  return (
    <Stack>
      {Object.entries(data).map(([key, value]) => (
        (key !== "_id") ?
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            {value ?
              <Input id={key} placeholder={value} name={key}></Input>
              : <Input id={key} placeholder="-" name={key}></Input>
            }
          </div> : null
      )
      )}
    </Stack>
  );
};


export default ModalEntry