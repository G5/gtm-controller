import IPartial from "./IPartial";

export default {
  type: 'div',
  innerHtml: `
    <form id="form-1" action="action_page.php">
      First name: <input type="text" value="Mickey"><br>
      Last name: <input type="text" name="lastname" value="Mouse"><br>
      <input type="submit" value="Submit">
    </form>
  `
} as IPartial;
