import React from "react";
import "./directory.styles.scss";
import MenuItem from "../menu-item/menu-item";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map((section) => (
      <MenuItem
        title={section.title}
        imageUrl={section.imageUrl}
        key={section.id}
        size={section.size}
        linkUrl={section.linkUrl}
      />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
